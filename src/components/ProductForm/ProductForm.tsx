import {
  Field,
  FieldArray,
  Form,
  Formik
} from 'formik';
import _set from 'lodash/set'
import React from 'react';
import ProductColorForm from 'src/components/ProductForm/ProductColorForm';
import ProductLogoForm from 'src/components/ProductForm/ProductLogoForm';
import { ProductSchema } from 'src/schemas';
import { ProductType } from 'src/types';
import { nprogressTry } from 'src/utils/nprogress';
import styled from 'styled-components'
import { ZodIssue } from 'zod';

const StyledDiv = styled.div`
  .footer {
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    border-top: 1px solid #011627;
  }
`

interface Props {
  product: ProductType
  onSubmit: (p: ProductType) => Promise<ProductType | void>
}

// const colorNames = [
//   'primary',
//   'secondary',
//   'tertiary'
// ]

const ProductForm: React.FC<Props> = (props) => {

  const {
    product,
    onSubmit
  } = props

  return (
    <Formik
      initialValues={product}
      validate={(values) => {
        const errors = {}
        try {
          ProductSchema.parse(values)
        } catch (e) {
          e.errors.forEach((e: ZodIssue) => {
            _set(errors, e.path, e.message)
          })
        }
        return errors
      }}
      onSubmit={(formValues, { setSubmitting, resetForm }) => {
        return nprogressTry(async () => {
          const updatedProduct = await onSubmit(formValues)
          if (updatedProduct) {
            setSubmitting(false)
            resetForm({
              values: updatedProduct
            })
          }
        })
      }}
    >
      {({ values, errors, isSubmitting, dirty }) => {

        console.log('errors', errors)
        console.log('values', values)

        const renderLogos = () => {

          if (!product) {
            return (
              <div>
                Save the product to add logos
              </div>
            )
          }
          return (

            <div className="row flex-wrap">
              <FieldArray
                name="attributes.logos"
                render={(arrayHelpers) => {
                  return (
                    <>
                      {values.attributes.logos.map((logo, i) => {
                        return (
                          <div
                            key={i}
                            className="col-6 col-md-4 col-lg-3 mb-2rem"
                          >
                            <ProductLogoForm
                              index={i}
                              className="h-100"
                              logo={logo}
                              product={product}
                              removeLogo={() => {
                                arrayHelpers.remove(i)
                              }}
                            />
                          </div>
                        );
                      })}
                      <div
                        style={{
                          minHeight: 300
                        }}
                        className="col-6 col-md-4 col-lg-3 mb-2rem"
                      >
                        <div className="card center h-100">
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              arrayHelpers.push({
                                name: ''
                              })
                            }}
                            className="stretched-link btn btn-sm btn-secondary"
                          >
                            Add logo
                          </button>
                        </div>
                      </div>
                    </>
                  )
                }}
              />
            </div>
          )
        }

        const renderColors = () => {
          if (!product) {
            return (
              <div>
                Save the product to add colors
              </div>
            )
          }
          return (
            <div className="row flex-wrap mb-2rem">
              <FieldArray
                name="attributes.colors"
                render={(arrayHelpers) => {
                  return (
                    <>
                      {values.attributes.colors.map((color, i) => {
                        return (
                          <div
                            key={i}
                            className="col-6 col-md-4 col-lg-3 mb-2rem"
                          >
                            <ProductColorForm
                              index={i}
                              className="h-100"
                              color={color}
                              removeColor={() => {
                                arrayHelpers.remove(i)
                              }}
                            />
                          </div>
                        );
                      })}
                      {values.attributes.colors.length < 3 && (
                        <div
                          style={{
                            minHeight: 300
                          }}
                          className="col-6 col-md-4 col-lg-3 mb-2rem"
                        >
                          <div className="card center h-100">
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                arrayHelpers.push({
                                  hex: '',
                                  name: ''
                                })
                              }}
                              className="stretched-link btn btn-sm btn-secondary"
                            >
                              Add color
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )
                }}
              />
            </div>
          )
        }

        return (
          <StyledDiv>

            <Form>

              <div className="form-group">
                <label htmlFor="id">id</label>
                <Field
                  id="id"
                  type="text"
                  className="form-control form-control-md"
                  placeholder="id"
                  disabled={Boolean(product.id)}
                  name="id"
                />
              </div>

              <div className="form-group">
                <label htmlFor="attributes.name">attributes.name</label>
                <Field
                  id="attributes.name"
                  type="text"
                  className="form-control form-control-md"
                  placeholder="name"
                  name="attributes.name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="attributes.githubUrl">attributes.githubUrl</label>
                <Field
                  id="attributes.githubUrl"
                  type="url"
                  className="form-control form-control-md"
                  placeholder="githubUrl"
                  name="attributes.githubUrl"
                />
              </div>

              <div className="form-group">
                <label htmlFor="attributes.url">attributes.url</label>
                <Field
                  id="attributes.url"
                  type="url"
                  className="form-control form-control-md"
                  required
                  placeholder="url"
                  name="attributes.url"
                />
              </div>

              <div>
                <label htmlFor="attributes.package.manager">attributes.package.manager</label>
                <div className="form-group">
                  <Field
                    as="select"
                    id="attributes.package.manager"
                    className="form-control form-control-md"
                    name="attributes.package.manager"
                  >
                    <option value={undefined}>Select a package manager</option>
                    <option value="npm">npm</option>
                  </Field>
                </div>
                <div className="form-group">
                  <label htmlFor="attributes.package.packageId">attributes.package.packageId</label>
                  <Field
                    id="attributes.package.packageId"
                    type="text"
                    className="form-control form-control-md"
                    placeholder="package id"
                    name="attributes.package.packageId"
                  />
                </div>
              </div>

              <div className="mb-2rem">
                <label htmlFor="attributes.logos">attributes.logos</label>
                {renderLogos()}
              </div>


              <div className="mb-2rem">
                <label htmlFor="attributes.colors">attributes.colors</label>
                {renderColors()}
              </div>

              <div className="footer">
                <div className="h-100 container d-flex flex-row align-items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting || !dirty}
                    className="btn btn-primary btn-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>

          </StyledDiv>
        )
      }}
    </Formik>
  );
}

export default ProductForm
