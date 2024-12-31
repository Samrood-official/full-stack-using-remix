import { FormLayout, TextField } from '@shopify/polaris';
import { useState } from 'react';
import { FormData } from '~/data';

export default function ProductForm({
  name, quatity, setQuantity, setName, isCreateNew
}: FormData) {
  const [isNameEditable, setIsNameEditable] = useState(false);
  const handleNameDoubleClick = () => {
    setIsNameEditable(true);
  };

  return (
    <FormLayout>
      {(isNameEditable || isCreateNew) ? (
        <TextField
          label="Product name"
          id="name"
          name="name"
          value={name}
          onChange={(value) => setName(value)}
          placeholder="Enter product name"
          autoComplete=""
        />
      ) : (
        <div
          onDoubleClick={handleNameDoubleClick}
          style={{
            padding: '10px',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold'
          }}
        >
          {name}
          <input type='text' defaultValue={name} name='name' id="name" hidden />
        </div>
      )}

      <TextField
        type="number"
        label="Product quantity"
        id="quantity"
        onChange={(value) => setQuantity(Number(value))}
        name="quantity"
        value={String(quatity)}
        autoComplete=''
      />
    </FormLayout>
  );
}
