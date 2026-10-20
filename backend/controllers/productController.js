import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {

    try {
        const { name, slug, category, description, images, price, discountPercentage, stock, isPublished } = req.body
        if (!name || !slug || !category || !description || !images || !price || !stock) {
            return res.status(404).json({ success: false, message: 'All required fields must be completed.' })
        }
        const newProduct = new Product({
            name,
            slug,
            category,
            description,
            images,
            price,
            discountPercentage,
            stock,
            isPublished
        })
        await newProduct.save()
        res.status(201).json({ success: true, message: 'Product created successfully.' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

export const updateProduct = async (req, res) => {

    try {
        const { id } = req.params
        const { name, slug, description, price, discountPercentage, stock, isPublished } = req.body
        const product = await Product.findOne({ id })
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' })
        }

        if (name != undefined) product.name = name
        if (slug != undefined) product.slug = slug
        if (description != undefined) product.description = description
        if (price != undefined) product.price = price
        if (discountPercentage != undefined) product.discountPercentage = discountPercentage
        if (stock != undefined) product.stock = stock
        if (isPublished != undefined) product.isPublished = isPublished

        await product.save()
        res.status(200).json({ success: true, message: 'Product updated successfully.', product })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

export const deleteProduct = async (req, res) => {

    try {
        const { id } = req.params
        const product = await Product.findOne({ id })
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' })
        }
        await product.deleteOne()
        res.status(200).json({ success: true, message: 'Product deleted successfully.' })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

export const getOneProduct = async (req, res) => {

    try {
        const { slug } = req.params
        const product = await Product.findOne({ slug })
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' })
        }
        res.status(201).json({ success: true, message: 'Product details fetched successfully.', product })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ success: true, message: 'All products fetched successfully.', products: products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getAllProductsBySearch = async (req, res) => {
    try {
        const { query } = req.params
        if (!query) {
            return res.status(400).json({ success: false, message: 'Search query is required.' });
        }
        const searchRegex = new RegExp(query, 'i');
        const products = await Product.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex }
            ]
        });
        res.status(200).json({ success: true, message: 'All products fetched successfully.', products: products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({ isPublished: true })
        if (!products) {
            return res.status(404).json({ success: false, message: 'No products found.' })
        }
        res.status(201).json({ success: true, message: 'Products fetched successfully.', products })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}