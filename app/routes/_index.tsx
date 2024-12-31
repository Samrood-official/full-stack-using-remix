import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, NavLink, useLoaderData } from "@remix-run/react";
import { Button } from "@shopify/polaris";
import { prisma } from "config/dbConfig";
import Table from "~/componants/Table";
import { ProductRecord } from "~/data";

export let loader: LoaderFunction = async () => {
    const items = await prisma.product.findMany() || []
    return { items }
};

export default function App() {
    const { items }: { items: ProductRecord[] } = useLoaderData();

    return (
        <section>
            <div className="table-container">
                <div className="create-button">
                    <NavLink
                        to="/product/create/new"
                    >
                        <Button variant="primary" size="large">Add Product </Button>
                    </NavLink>
                </div>
                <Table products={items} />
            </div>
        </section>
    );
}