import React from 'react';
import { LogoType } from 'src/types';

interface Props {
  logo: Partial<LogoType>
}

const ProductLogoAttributes: React.FC<Props> = (props) => {

  const {
    logo,
  } = props;

  return (
    <small>
      <pre className="mb-0">
        <code>
            <div>
              <strong>
                pathname:
              </strong> {logo.pathname}
            </div>
            <div>
              <strong>
                src:
              </strong> {logo.src}
            </div>
            <div>
              <strong>
                width:
              </strong> {logo.width}
            </div>
            <div>
              <strong>
                height:
              </strong> {logo.height}
            </div>
        </code>
      </pre>
    </small>
  );
}

export default ProductLogoAttributes
