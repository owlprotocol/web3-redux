## How to use in component with styled-component

1. import useTheme object in component to expose colors variables

```
import { useTheme } from '@chakra-ui/react';
const { themes } = useTheme();
```

2. add styled-component variable
```
color9={themes.color9}
```

3. add styled-component css
```
background: ${(props: any) => props.bg};
```
