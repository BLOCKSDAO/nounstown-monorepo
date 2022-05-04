import { useReverseENSLookUp } from "../../utils/ensLookup";

interface EnsOrLongAddressProps {
    address: string;
}
const EnsOrLongAddress: React.FC<EnsOrLongAddressProps> = props => {
    const {address} = props;
    const ens = useReverseENSLookUp(address);
    return <>{ens ? ens : address}</>;
};

export default EnsOrLongAddress;