import { Box, Tag, CloseButton, useTheme } from '@chakra-ui/react';
import { useState } from 'react';
import _ from 'lodash';
import Pagination from 'rc-pagination';
import styled from 'styled-components';

const CONTAINER_HEIGHT = '500px';
const Wrapper = styled.div`
    .page-controls {
        list-style-type: none;
        display: flex;

        & > li {
            padding: 0 8px;
            cursor: pointer;

            &:after {
                content: '|';
                position: relative;
                left: 8px;
                top: -1px;
                font-size: 11px;
            }
        }

        .rc-pagination-prev,
        .rc-pagination-next {
            display: none;
        }
    }
`;

export interface Props {
    items: string[];
    handleRemoveAddress: any;
    pageSize: number;
}

const AddressList = ({ items = [], handleRemoveAddress, pageSize = 20 }: Props) => {
    const { themes } = useTheme();

    const [currentPage, setCurrentPage] = useState(1);
    const onChange = (page: number) => {
        setCurrentPage(page);
    };
    const visibleItems = _.chunk(items, pageSize);

    return (
        <Wrapper>
            <Box borderRadius={'12px'} bg={themes.color6} p={'16px'}>
                <Box mb={8} height={CONTAINER_HEIGHT} overflowY={'auto'}>
                    <Box flexWrap={'wrap'} flexDir={'row'}>
                        {visibleItems[currentPage - 1]?.map((address, key) => (
                            <Box p={2} key={key} w={'50%'} display={'inline-block'}>
                                <Tag variant="solid" bg={themes.color5} as="button" w={'100%'}>
                                    <Box
                                        h={4}
                                        w={'95%'}
                                        overflow={'hidden'}
                                        display={'inline-block'}
                                        color={themes.color9}
                                    >
                                        {address}
                                    </Box>
                                    <CloseButton onClick={handleRemoveAddress} float={'right'} color={themes.color9} />
                                </Tag>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    bg={themes.color5}
                    color={themes.color9}
                    p={'11px 16px'}
                    m={'-14px'}
                    borderRadius={'0 0 10px 10px'}
                    fontSize={'12px'}
                    fontWeight={'semibold'}
                >
                    <Pagination
                        onChange={onChange}
                        current={currentPage}
                        total={items.length}
                        pageSize={pageSize}
                        className="page-controls"
                    />
                    <div>
                        {visibleItems[currentPage - 1]?.length}/{items.length}
                    </div>
                </Box>
            </Box>
        </Wrapper>
    );
};

export default AddressList;
