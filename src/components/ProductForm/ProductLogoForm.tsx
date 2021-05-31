import axios from 'axios';
import classnames from 'classnames';
import {
  Field,
  useField
} from 'formik'
import React, {
  useEffect,
  useState
} from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'react-feather';
import revisionHash from 'rev-hash';
import ProductLogoAttributes from 'src/components/ProductForm/ProductLogoAttributes';
import {
  LogoType,
  ProductType,
  UpdatedLogoType
} from 'src/types';
import { makePathnameAndSrc } from 'src/utils/logoUtils';

import styled from 'styled-components'

const StyledDiv = styled.div`
  .dropzone {
    flex-grow: 1;
    cursor: pointer;
  }

  .card-body {
    flex-grow: 0;
  }
`

interface Props {
  product: ProductType
  index: number
  logo: LogoType,
  removeLogo: () => void
  className?: string
}

const ProductLogoForm: React.FC<Props> = (props) => {

  const {
    product,
    index,
    removeLogo,
    className,
  } = props

  const [field, meta, helpers] = useField({
    name: `attributes.logos.${index}`
  });

  const logo = field.value

  const [preview, setPreview] = useState<string | null>(null)
  const [hash, setHash] = useState<string | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/svg+xml',
    maxFiles: 1,
    multiple: false,
    onDrop: async (files) => {
      const file = files[0]
      if (file) {
        const preview = URL.createObjectURL(file)
        const { data: svg } = await axios.get(preview)
        const img = new Image();
        const hash = revisionHash(svg)
        setHash(hash)
        img.addEventListener('load', function () {
          const updatedLogo: UpdatedLogoType = {
            ...logo,
            svg,
            width: img.naturalWidth,
            height: img.naturalHeight,
            ...makePathnameAndSrc(product, logo.name, hash)
          }
          helpers.setValue(updatedLogo)
        });
        setPreview(preview)
        img.src = preview;
      }
    }
  });

  useEffect(() => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
  }, [preview])

  useEffect(() => {
    if (!hash) {
      return
    }
    helpers.setValue({
      ...logo,
      ...makePathnameAndSrc(product, logo.name, hash)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo.name])

  const nameInputId = `attributes.logos.${index}.name`
  const previewImgSrc = preview || logo.pathname
  const existsAlready = product.attributes.logos[index]

  return (
    <StyledDiv className={classnames('card', className, meta.touched && meta.error && 'was-validated')}>
      <div
        style={{
          background: 'lightgray'
        }}
        {...getRootProps({ className: 'dropzone center p-2rem w-100 position-relative' })}>
        {previewImgSrc && (
          <img
            style={{
              maxHeight: 100,
              maxWidth: 200
            }}
            alt={`Draft of a new logo for product ${product.attributes.name}`}
            src={previewImgSrc}
          />
        )}
        <div
          className="p-2"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          <Upload />
        </div>
        <input {...getInputProps()} />
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="form-group">
          <label htmlFor={nameInputId}>name</label>
          <Field
            id={nameInputId}
            type="text"
            placeholder="name"
            className="form-control form-control-sm"
            disabled={Boolean(existsAlready)}
            required
            name={`attributes.logos.${index}.name`}
          />
        </div>
        <ProductLogoAttributes logo={logo} />
      </div>
      <div className="card-footer d-flex flex-row justify-content-between">
        {existsAlready ? (
          <button className="btn btn-default btn-sm">
            Archive
          </button>
        ) : (
          <button
            onClick={() => removeLogo()}
            className="btn btn-danger btn-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </StyledDiv>
  );
}

export default ProductLogoForm
