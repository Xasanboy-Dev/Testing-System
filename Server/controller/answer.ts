import { Request, Response } from "express";
import {
  deleteAnswer,
  editAnswer,
  findAllAnswers,
  getOneAnswer,
} from "../database/answer";
import { VERIFY } from "../database/token";

export async function getAllAnswers(req: Request, res: Response) {
  try {
    const token: any = req.headers.authorization;
    if (token && token.typeOf == "admin") {
      const anwers = await findAllAnswers();
      return res.status(200).json({ message: "All anwers", anwers });
    }
    return res.status(409).json({ message: "You are not teacher!" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function updateAnswer(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const { id, text } = req.params;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const answer = await getOneAnswer(+id);
      if (answer) {
        const editedAnwer = await editAnswer(
          answer.id,
          text ?? answer.text,
          answer.testId!
        );
        return res
          .status(200)
          .json({ message: "Edited succesfully!", answer: editedAnwer });
      }
      return res.status(404).json({ message: "Answer is not found" });
    }
    return res.status(400).json({ message: "You must to login!" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function findOneAnswer(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const answer = await getOneAnswer(+id);
      if (answer) {
        return res.status(200).json({ message: "All right", answer });
      }
      return res.status(404).json({ message: "Answer is not found!" });
    }
    return res.status(401).json({ message: "You must to login!" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function removeAnswer(req: Request, res: Response) {
  try {
    const token: any = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const answer = await getOneAnswer(+id);
      if (answer) {
        if (answer.ownerId == token.id) {
          const deletedAnswer = await deleteAnswer(+id);
          return res
            .status(200)
            .json({ message: "Deleted succefully", answer: deleteAnswer });
        }
        return res.status(409).json({ message: "Yu must to login!" });
      }
      return res.status(404).json({ message: "Anwer is not found!" });
    }
    res.status(401).json({ message: "You must to login!" });
  } catch (error: any) {
    console.log(error.message);
  }
}
