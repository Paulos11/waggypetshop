const Brand = require("@/models/brand.model");
const { errorHandle } = require("@/lib");

class brandController {
  index = async (req, res, next) => {
    try {
      const brands = await Brand.find();
      res.json(brands);
    } catch (error) {
      errorHandle(error, next);
    }
  };

  store = async (req, res, next) => {
    try {
      const brand = await Brand.create(req.body);
      res.status(201).json({
        message: "Brand Added Successfully",
      });
    } catch (error) {
      errorHandle(error, next);
    }
  };

  show = async (req, res, next) => {
    try {
      const brand = await Brand.findById(req.params.id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      errorHandle(error, next);
    }
  };

  update = async (req, res, next) => {
    try {
      const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json({ message: "Brand updated successfully", brand });
    } catch (error) {
      errorHandle(error, next);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const brand = await Brand.findByIdAndDelete(req.params.id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.json({ message: "Brand deleted successfully" });
    } catch (error) {
      errorHandle(error, next);
    }
  };
}

module.exports = new brandController();
