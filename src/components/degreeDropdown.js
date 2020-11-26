import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class degreeDropdown extends Component {
    render() {
        return (
            <Dropdown options={['one','two']} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
        );
    }
}

export default degreeDropdown;

