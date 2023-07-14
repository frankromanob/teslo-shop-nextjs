import { ISize } from "@/interfaces";
import { Box, Button } from "@mui/material";

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
}

export const ItemSizeSelector = ({ selectedSize, sizes }: Props) => {
    console.log(selectedSize)
    return (
        <Box>
            {
                sizes.map(size => (
                    <Button
                        key={ size }
                        size='small'
                        color={ selectedSize === size ? 'primary' : 'info' }
                    >
                        { size }
                    </Button>
                ))
            }
        </Box>
    )
}
