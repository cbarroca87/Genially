import Genially from "../models/genially"
import moment from 'moment-timezone';
import { Response, Request } from "express";
import { isValidObjectId } from "mongoose";
// import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
// import Genially from "../../contexts/core/genially/domain/Genially";


export const saveGenially = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const createdAt = moment().tz("Europe/Madrid").format("YYYY-MM-DD HH:mm:ss");
  try {
    const genially = new Genially({
      name,
      description,
      createdAt
    });
    await genially.save();
    res.status(201).json({ name, description });
  } catch (e) {
    res.status(500).json({
      msg: 'The user cannot be created: ', 
      error: e
    });
  }

};

// Obtención de Geniallies paginados con el total. Recibe por parámetro limite y desde
export const getGeniallies = async (req: Request, res: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const [total, geniallies] = await Promise.all([
    Genially.countDocuments(),
    Genially.find()
      .limit(Number(limite))
      .skip(Number(desde))
  ]);
  res.json({
    total,
    geniallies
  });
};


export const deleteGenially = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedAt = moment().tz("Europe/Madrid").format("YYYY-MM-DD HH:mm:ss");
  const data = {
    deletedAt
  };
  // console.log(data);
  if (!isValidObjectId(id)) {
    res.status(400).json({ msg: `id ${id} is not a valid Mongo ID` });
  } else {
    try {
      const genially = await Genially.findOneAndUpdate({ _id: id }, data, { new: true });
      if (!genially) {
        res.status(400).json({
          msg: `Genially with id ${id} not exists`
        });
      } else {
        res.status(201).json(
          {
            msg: `Genially with id ${id} is successfully deleted`
          });
      }
    } catch (e) {
      res.status(500).json({
        msg: `the user could not be deleted`
      });
    }

  }
};

export const modifyGenially = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const modifiedAt = moment().tz("Europe/Madrid").format("YYYY-MM-DD HH:mm:ss");

  if (!isValidObjectId(id)) {
    res.status(400).json({
      msg: `id ${id} is not a valid Mongo ID`
    });
  } else {
    const data = {
      name,
      description,
      modifiedAt
    };
    try {
      const genially = await Genially.findOneAndUpdate({ _id: id }, data, { new: true });
      if (!genially) {
        res.status(400).json({ msg: `Genially with id ${id} not exists` });
      } else {
        res.status(201).json({
          genially
        });
      }
    } catch (e) {
      res.status(500).json({
        msg: `the user could not be updated`
      });
    }

  }
};


