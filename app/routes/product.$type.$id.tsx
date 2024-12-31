import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData, useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from '@shopify/polaris';
import invariant from "tiny-invariant";

import { prisma } from "config/dbConfig";
import ProductForm from "~/componants/ProductForm";
import { handleErrors, updateProduct } from "~/data";

export const loader = async ({
    params
}: LoaderFunctionArgs) => {
    invariant(params.id, "Missing contactId param");

    if (params.id === 'new') {
        return {}
    }

    const product = await prisma.product.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!product) {
        throw new Response("Not Found", { status: 404 });
    }
    return product;
};


export const action = async ({
    params,
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const name = String(formData.get("name"));
    const quantity = Number(formData.get("quantity"));
    const errors = handleErrors(name, quantity)

    if (Object.keys(errors).length > 0) {
        return json({ errors });
    }

    await updateProduct(params.id, name, quantity)

    return redirect(`/`);
}

export default function App() {
    const { name: initialName, quantity: initialQuantity, id }: { name: string, quantity: number, id: string } = useLoaderData()
    const [name, setName] = useState(initialName);
    const [isCreateNew, setIsCreateNew] = useState(false);
    const [quantity, setQuantity] = useState(initialQuantity);
    const location = useLocation();
    const actionData: any = useActionData()

    useEffect(() => {
        if (location?.pathname.startsWith("/product/create")) {
            setIsCreateNew(true)
        }

        if (actionData?.errors) {
            const { errors } = actionData;
            if (errors.name) {
                return alert(errors.name);
            }
            if (errors.quantity) {
                return alert(errors.quantity);
            }
        }

    }, [actionData]);

    return (
        <section >
            <h2 style={{
                padding: '10px',
                cursor: 'pointer',
                fontSize: '20px',
                fontWeight: 'bold'
            }}>
                {isCreateNew ? 'Create' : 'Edit'} page
            </h2>
            <Form method="post" className="product-form">
                <ProductForm isCreateNew={isCreateNew} name={name} quatity={quantity} setName={setName} setQuantity={setQuantity} />
                <div className="button-group">
                    <Button variant="primary" submit>Save</Button>
                    <Button size="large" onClick={() => {
                        setName(initialName); setQuantity(initialQuantity);
                    }}>Reset</Button>
                    {id ?
                        <button
                            formAction="destroy"
                            onClick={(event) => {
                                const response = confirm(
                                    "Please confirm you want to delete this record."
                                );
                                if (!response) {
                                    event.preventDefault();
                                }
                            }}
                        >Delete</button >
                        : null
                    }
                </div>
            </Form>
        </section>
    );
}
