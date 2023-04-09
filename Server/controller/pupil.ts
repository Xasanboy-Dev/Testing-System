import { Request, Response } from "express";
import { VERIFY } from "../database/token";
import {
  addPupil,
  deletePupil,
  editPupil,
  findOnePupil,
  findPupils,
} from "../database/pupil";

export async function GetPupils(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const ValidToken: any = VERIFY(token);
      if (ValidToken.typeOf == "admin") {
        const allPupils = await findPupils();
        return res
          .status(200)
          .json({ message: "All pupils", pupils: allPupils });
      } else {
        return res.status(400).json({ message: "You must to login!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getOnePupil(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const pupil = await findOnePupil(+id);
      if (pupil) {
        return res.status(200).json({ message: "All Right", pupil });
      } else {
        return res.status(404).json({ message: "Pupil is not found!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ mesage: "Internal error" });
  }
}

export async function createPupil(req: Request, res: Response) {
  try {
    const {
      name,
      lastname,
      phoneNumber,
      address,
      bio,
      currentClass,
      teacherId,
      schoolId,
      password,
    } = req.body;
    const pupil = await addPupil(
      name,
      lastname,
      phoneNumber,
      address,
      bio,
      currentClass,
      teacherId,
      schoolId,
      password
    );
    if (pupil) {
      return res
        .status(201)
        .json({ message: "Pupil added succesfully", pupil });
    } else {
      return res.status(400).json({ message: "You have some problems" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ mesage: "Internal error" });
  }
}

export async function UpdatePupil(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const {
      id,
      name,
      lastname,
      phoneNumber,
      address,
      bio,
      currentClass,
      password,
    } = req.body;
    if (token && id) {
      const ValidToken: any = VERIFY(token);
      const pupil = await findOnePupil(+id);
      if (pupil) {
        const updatedPupil = await editPupil(
          pupil.id,
          name ?? pupil.name,
          lastname ?? pupil.lastname,
          phoneNumber ?? pupil.phoneNumber,
          address ?? pupil.address,
          bio ?? pupil.bio,
          currentClass ?? pupil.currentClass,
          password ?? pupil.password
        );
        return res.status(200).json({ messahe: "Edited succesfully!" });
      } else {
        return res.status(404).json({ message: "You have some problems!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ mesage: "Internal error" });
  }
}

export async function removePupil(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (token) {
      const ValidToken = VERIFY(token);
      const pupil = await findOnePupil(+id);
      if (pupil) {
        const removeduser = deletePupil(+id);
        return res.status(200).json({ message: "Deleted sucesfully" });
      } else {
        return res.status(404).json({ message: "User is not exist!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ mesage: "Internal error" });
  }
}
