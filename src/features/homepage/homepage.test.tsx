import { mount, ReactWrapper } from 'enzyme'

import { Wrapper } from '~/src/app/wrapper'
import Homepage from './homepage.component'

describe('homepage', () => {

    let component: ReactWrapper<typeof Wrapper, void>
    
    beforeAll(() => {
        component = mount<typeof Wrapper, void>(
            <Wrapper>
                <Homepage />
            </Wrapper>
        )
    })

    afterAll(() => {
        component.unmount()
    })

    it('should render', () => {
        expect(component).toMatchSnapshot()
    })
})
