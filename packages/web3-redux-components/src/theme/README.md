# Chakra UI Theme System

## Exposing the color variables

```
import { useTheme } from '@chakra-ui/react';
const { themes } = useTheme();

Usage: themes.color5
```

## Usage with any Chakra component

Any chakra component has props such as `color` and `bg`


```
Usage: <Box bg={themes.color5} />
```


## How to use in component with styled-components

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
