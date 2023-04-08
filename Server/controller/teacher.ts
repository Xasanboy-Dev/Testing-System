import { Request, Response } from "express";
import { VERIFY } from "../database/token";
import {
  addTeacher,
  findteacherById,
  findAllAdmins,
  removeTeacher,
  editteacher,
} from "../database/teacher";

export async function getAllteachers(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const ValidToken: any = VERIFY(token);
      if (ValidToken.typeOf == "admin") {
        const teachers = await findAllAdmins();
        return res.status(200).json({ message: "All teachers", teachers });
      } else {
        return res.status(400).json({ message: "Yu are not allowed to here!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getOneTeacher(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const teacher = await findteacherById(+id);
      if (teacher) {
        return res.status(200).json({ message: "Teacher", teacher });
      } else {
        return res.status(404).json({ message: "Teacher is not exist!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createTeacher(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const {
      address,
      lastname,
      name,
      bio,
      schoolId,
      password,
      phoneNumber,
    }: {
      address: string;
      lastname: string;
      name: string;
      bio: string;
      schoolId: number;
      password: string;
      phoneNumber: string;
    } = req.body;
    if (token) {
      const ValidToken: any = VERIFY(token);
      if (ValidToken.typeOf == "admin") {
        const teacher = await addTeacher(
          address,
          lastname,
          name,
          bio,
          schoolId,
          password,
          phoneNumber
        );
        return res
          .status(201)
          .json({ message: "Teacher created succesfully", teacher });
      } else {
        return res
          .status(404)
          .json({ messae: "You are not allowed to do this!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function updateTeacher(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const {
      id,
      address,
      lastname,
      name,
      bio,
      schoolId,
      password,
      phoneNumber,
    }: {
      id: number;
      address: string;
      lastname: string;
      name: string;
      bio: string;
      schoolId: number;
      password: string;
      phoneNumber: string;
    } = req.body;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const teacher = await findteacherById(id);
      if (teacher) {
        const updatedTeacher = await editteacher(
          address ?? teacher.adddress,
          lastname ?? teacher.lastname,
          name ?? teacher.name,
          bio ?? teacher.bio,
          schoolId ?? teacher.schoolId,
          id,
          password ?? teacher.password,
          phoneNumber ?? teacher.phoneNumber
        );
        return res
          .status(200)
          .json({
            message: "Teacher esited succesfully",
            teacher: updatedTeacher,
          });
      } else {
        return res.status(400).json({ message: "You have some problems!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deleteTeacher(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const teacher = await findteacherById(+id);
      if (teacher) {
        const deletedTeacher = await removeTeacher(+id);
        return res.status(200).json({
          message: "Teacher is deleted succesfully",
          teacher: deletedTeacher,
        });
      } else {
        return res.status(400).json({ message: "Teacher is not found" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}
