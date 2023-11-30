import Product from "../schema/productSchema.js";

export const addProduct = async (req, res) => {
  const productData = req.body;
  const newProduct = new Product(productData);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const matchedProduct = await Product.findById(req.params.id);
    res.status(200).json(matchedProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const editProduct = async (req, res) => {
//   const productData = req.body;
//   const editProduct = new Product(productData);

//   try {
//     await Product.findByIdAndUpdate({ _id: req.params.id }, productData);
//     res.status(201).json(editProduct);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const editProduct = async (req, res) => {
    const updatedProductData = req.body;
  
    try {
      // Fetch the existing product
      const existingProduct = await Product.findById(req.params.id);
  
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Compare and exclude fields from updates
      const fieldsToExclude = ['name', 'description', 'category', 'manufacturer', 'batchNumber', 'expirationDate', 'productionDate'];
      fieldsToExclude.forEach((field) => {
        if (existingProduct[field] !== updatedProductData[field]) {
          // Field is being updated, store the previous value
          updatedProductData[field] = existingProduct[field];
        }
      });
  
      // Update the product
      await Product.findByIdAndUpdate({ _id: req.params.id }, updatedProductData);
  
      res.status(201).json(updatedProductData);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  

export const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: `Product Deleted Successfully` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const searchProduct = async (req, res) => {
  const productName = req.body.name;

  try {
    const product = await Product.findOne({ name: productName });

    if (product) {
      res.status(200).json([product]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
