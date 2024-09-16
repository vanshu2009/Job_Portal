import { Company } from "../models/companymodel.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "company name is required.",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "you can't register same company",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      res.status(404).json({
        message: "companies not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.param.id;
    const company = await Company.findById(companyId);
    if (!companies) {
      res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, loaction } = req.body;
    const file = req.file;
    //idhar cloudinary aayega
    const updateData = { name, description, website, loaction };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!companies) {
      res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    res.status(200).json({
        message:"company imformation updated.",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
