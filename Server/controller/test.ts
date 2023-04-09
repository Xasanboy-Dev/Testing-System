import { Request, Response, text } from "express";
import { VERIFY } from "../database/token";
import {
  addTest,
  editTest,
  findAllTests,
  findOneTest,
  removeTest,
} from "../database/test";
import { addAnswer } from "../database/answer";

export async function getAlltests(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const ValidToken = VERIFY(token);
      const tests = await findAllTests();
      return res.status(200).json({ message: "All tests", tests });
    } else {
      return res.status(401).json({ message: "You must to login" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ messsage: "Internal error" });
  }
}

export async function getOneTest(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const test = await findOneTest(+id);
      if (test) {
        return res.status(200).json({ message: `Test with id: ${id}`, test });
      }
      return res.status(404).json({ message: "Test is not found!" });
    }
    return res.status(401).json({ message: "You must to login!" });
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}
export async function createTest(req: Request, res: Response) {
  try {
    const token: any = req.headers.authorization;
    const { question, answers }: { question: string; answers: string[] } =
      req.body;
    if (token && question) {
      if (token.typeOf == "admin") {
        const ValidToken = VERIFY(token);
        const test = await addTest(question, +token.id);
        answers.map(async (str) => {
          await addAnswer(str, test.id, +token.id);
        });
        return res
          .status(201)
          .json({ message: "Question created sucesfully", test });
      }
      return res.status(409).json({ message: "You can't create test" });
    }
    return res.status(401).json({ message: "You must to login!" });
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function updateTest(req: Request, res: Response) {
  try {
    const token: any = req.headers.authorization;
    const { id, text } = req.body;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const test = await findOneTest(+id);
      if (test) {
        if (test.ownerId == token.id) {
          const editedTest = await editTest(test.id, text ?? test.text);
          return res
            .status(200)
            .json({ message: "Updated succesfully", test: editedTest });
        }
        return res
          .status(409)
          .json({ message: "You can n't edit another's test!" });
      }
      return res.status(404).json({ message: "Test is not found!" });
    }
    return res.status(401).json({ message: "You must to login!" });
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}
export async function deleteTest(req: Request, res: Response) {
  try {
    const token: any = req.headers.authorization;
    const { id } = req.params;
    if (token && id) {
      const ValidToken = VERIFY(token);
      const test = await findOneTest(+id);
      if (test) {
        if (test.id == +token.id) {
          const test = await removeTest(+id);
          return res
            .status(200)
            .json({ message: "Test deleted succesfully!", test });
        }
        return res.status(409).json({ message: "It is not your test!" });
      }

      return res.status(404).json({ message: "Test is not found!" });
    }
    return res.status(401).json({ message: "You must to login!" });
  } catch (error: any) {
    console.log(error.mesage);
    res.status(500).json({ message: "Internal error" });
  }
}
