import { useState, useLayoutEffect, useRef } from 'react';
import classnames from 'classnames';
import { Wrapper } from './styles';
import Icon from '../Icon';

const items: { name: string; amount: string | undefined; icon: string | undefined }[] = [
    {
        amount: '0.00000000',
        icon: 'BTC',
        name: 'BTC',
    },
    {
        amount: '0.00000000',
        icon: 'ETH',
        name: 'ETH',
    },
];

export const WalletDropdown = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chosen, setChosen] = useState(items[0]);
    const classname = classnames('Dropdown-root', { 'is-open': isOpen });

    const elmRef = useRef<any>();

    useLayoutEffect(() => {
        document.body.addEventListener('click', onOutsideClick);

        return () => {
            document.body.removeEventListener('click', onOutsideClick);
        };
    }, []);

    const onOutsideClick = (event: any) => {
        if (elmRef.current.contains(event.target)) {
            return;
        }
        setIsOpen(false);
    };

    return (
        <Wrapper className={classname} ref={elmRef}>
            <div className="Dropdown-control" onClick={() => setIsOpen(!isOpen)}>
                <span>{chosen.amount}</span>
                <Icon icon={chosen.icon} />
                {isOpen ? <Icon icon="chevron-up" transform={'rotate(180deg)'} /> : <Icon icon="chevron-down" />}
            </div>

            {isOpen && (
                <div className="Dropdown-menu">
                    {items.map(({ amount, icon, name }) => (
                        <div
                            className="list-item"
                            key={name}
                            onClick={() => {
                                //@ts-ignore
                                setChosen(_.find(items, { name }));
                                setIsOpen(false);
                            }}
                        >
                            <span>{amount}</span>
                            <Icon icon={icon} />
                            <span>{name}</span>
                        </div>
                    ))}
                </div>
            )}
        </Wrapper>
    );
};

export default WalletDropdown;
