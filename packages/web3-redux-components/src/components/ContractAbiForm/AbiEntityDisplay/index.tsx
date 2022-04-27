// const types = [
//     constructor
//     event
//     address
//     function
//     bool
//     string
//     uint256
//     uint8
// ]

interface Props {
    entityName: string;
    entityType: string;
}

const AbiEntityDisplay = ({ entityName, entityType }: Props) => {
    return (
        <div>
            name: {entityName}
            type: {entityType}
        </div>
    );
};

export default AbiEntityDisplay;
