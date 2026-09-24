function ProductLink({ product }) {
  if (!product?.url) return null;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="product-link"
    >
      {product.name}
    </a>
  );
}

export default ProductLink;