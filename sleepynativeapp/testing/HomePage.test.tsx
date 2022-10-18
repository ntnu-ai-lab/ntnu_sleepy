import { HomePage } from '../components/pages/HomePage';
import renderer from 'react-test-renderer';

describe("Test HomePage: ", () => {

    it("Renders correctly", async () => {
        const component = renderer.create(<HomePage />).toJSON()
        expect(component).toMatchSnapshot();
    })
})