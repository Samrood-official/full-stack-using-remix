import { prisma } from "config/dbConfig";

export type ProductRecord = {
  id: string;
  name: string;
  quantity: number;
};

export interface FormData {
  name: string,
  quatity: number | string,
  setQuantity: (value: number) => void,
  setName: (value: string) => void,
  isCreateNew: boolean,
}

export const handleErrors = (name: string, quantity: number) => {
  const errors: { name?: string, quantity?: string } = {};
  if (!name) {
      errors.name = "name field is empty";
  } else if (!quantity) {
      errors.quantity = "quantity field is empty";
  }

  return errors;
}

export const updateProduct = async (id:string | undefined, name: string, quantity: number) => {
  if (id === 'new') {
      await prisma.product.create({ data: { name, quantity }, });
  } else {
      await prisma.product.update({
          where: {
              id: id,
          },
          data: {
              name,
              quantity
          },
      });
  }
}

export const deleteProduct = async (id:string) => {
  await prisma.product.delete({ where: {id}})
}
