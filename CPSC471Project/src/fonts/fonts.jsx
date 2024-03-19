import {extendTheme} from '@chakra-ui/react'
import '@fontsource-variable/inter'

const theme = extendTheme({
    fonts: {
        heading: `'inter', sans-serif`,
        body: `'inter', sans-serif`
    }
});

export default theme;