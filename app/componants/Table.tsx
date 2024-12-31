import { NavLink } from '@remix-run/react';
import {
    IndexTable,
    Text,
    useBreakpoints,
    LegacyCard,
    Button,
} from '@shopify/polaris';
import { ProductRecord } from '~/data';

export default function Table({ products }: { products: ProductRecord[] }) {

    const resourceName = {
        singular: 'product',
        plural: 'products',
    };

    const rowMarkup = products.map(
        (
            { id, name, quantity },
            index,
        ) => (
            <IndexTable.Row id={id} key={id} position={index}>
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {name}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{quantity}</IndexTable.Cell>
                <IndexTable.Cell>
                    <NavLink
                        to={`/product/edit/${id}`}
                    >
                        <Button>Edit</Button>
                    </NavLink>
                </IndexTable.Cell>
            </IndexTable.Row>
        ),
    );

    return (
        <LegacyCard>
            <IndexTable
                condensed={useBreakpoints().smDown}
                resourceName={resourceName}
                itemCount={products.length}
                headings={[
                    { title: 'Name' },
                    { title: 'Quantity' },
                    { title: 'Action' },
                ]}
                selectable={false}
            >
                {rowMarkup}
            </IndexTable>
        </LegacyCard>
    );
}