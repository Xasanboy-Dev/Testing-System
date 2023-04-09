import { useEffect, useState } from "react"
import Navbar from "./Navbar/Navbar"
import { NavLink } from "react-router-dom"
export default function HomePage({ toggle, setToggle }: { toggle: string, setToggle: (toggle: string) => void }) {
    return (
        <div className={`text-2xl  bg-${toggle == "true" ? "white" : "black"}`}>
            <Navbar setToggle={setToggle} toggle={toggle} />
            <div style={{ height: innerHeight }}>
                <h1 className={`flex justify-center text-3xl text-${toggle == "true" ? "black" : "white"} my-2`}>About examination</h1>
                <h1 className={`py-5 mx-[250px] cursor-pointer text-${toggle == "true" ? "black" : "white"}`}>
                    An examination (exam or evaluation) or test is an educational assessment intended to measure a test-taker's knowledge, skill, aptitude, physical fitness, or classification in many other topics (e.g., beliefs). A test may be administered verbally, on paper, on a computer, or in a predetermined area that requires a test taker to demonstrate or perform a set of skills.

                    Tests vary in style, rigor and requirements. There is no general consensus or invariable standard for test formats and difficulty. Often, the format and difficulty of the test is dependent upon the educational philosophy of the instructor, subject matter, class size, policy of the educational institution, and requirements of accreditation or governing bodies.

                    A test may be administered formally or informally. An example of an informal test is a reading test administered by a parent to a child. A formal test might be a final examination administered by a teacher in a classroom or an IQ test administered by a psychologist in a clinic. Formal testing often results in a grade or a test score.[2] A test score may be interpreted with regards to a norm or criterion, or occasionally both. The norm may be established independently, or by statistical analysis of a large number of participants.

                    A test may be developed and administered by an instructor, a clinician, a governing body, or a test provider. In some instances, the developer of the test may not be directly responsible for its administration. For example, Educational Testing Service (ETS), a nonprofit educational testing and assessment organization, develops standardized tests such as the SAT but may not directly be involved in the administration or proctoring of these tests.
                </h1>
                <div className={`text-${toggle == "true" ? "black" : "white"} w-full flex justify-center bg-${toggle == "true" ? "white" : "black"}`}>
                    <NavLink className={`border my-4 px-4 py-1 rounded border-${toggle == "true" ? "black" : "white"}`} to={"/test"}>Testing</NavLink>
                </div>
            </div>
        </div>
    )
}