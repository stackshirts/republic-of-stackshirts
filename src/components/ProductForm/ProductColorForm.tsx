import classnames from 'classnames';
import { useFormikContext, Field } from 'formik';
import React from 'react';
import {
  ColorType,
  ProductType
} from 'src/types';

type Props = {
  color: ColorType
  className?: string
  removeColor: () => void
  index: number
}

const ProductColorForm: React.FC<Props> = (props) => {

  const {
    color,
    removeColor,
    index,
    className,
  } = props

  const { errors } = useFormikContext<ProductType>()
  // TODO: add resolve for zod
  const errorOnColor: any = errors.attributes?.colors?.[index]

  return (
    <div className={classnames('card', className)}>
      <div
        style={{
          background: color.hex,
          height: 100
        }}
      />
      <div className="card-body">
        <div className="position-relative form-group">
          <label htmlFor="attributes.hex">hex</label>
          <Field
            type="text"
            className={classnames('form-control form-control-sm', errorOnColor?.hex && 'is-invalid')}
            placeholder="hex"
            name={`attributes.colors.${index}.hex`}
          />
        </div>
        <div className="position-relative">
          <label htmlFor="attributes.colors">name</label>
          <Field
            // disabled={Boolean(color.name)}
            type="text"
            className={classnames('form-control form-control-sm', errorOnColor?.name && 'is-invalid')}
            placeholder="name"
            name={`attributes.colors.${index}.name`}
          />
        </div>
      </div>
      <div className="card-footer">
        <button
          onClick={(e) => {
            e.preventDefault()
            if (!color.name) {
              removeColor()
            }
          }}
          className="btn btn-danger btn-sm"
        >
          {color.name ? 'Archive' : 'Cancel'}
        </button>
      </div>

    </div>

  );
}

export default ProductColorForm
