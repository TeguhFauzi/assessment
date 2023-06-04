import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { API } from "../config/api";

function AddAssessmentModal({ isOpen, onHide, refetch }) {
  const title = "Admin Add Assessment";
  document.title = "Assessment | " + title;
  const [addAssessment, setAddAssessment] = useState({});

  const handleChange = (e) => {
    setAddAssessment({
      ...addAssessment,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const addButtonHandler = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("name", addAssessment.name);
      formData.set("math", addAssessment.math);
      formData.set("science", addAssessment.science);
      formData.set("english", addAssessment.english);
      formData.set("soft_skill", addAssessment.soft_skill);

      const response = await API.post("/student", formData, config);
      console.log("add assessment success : ", response);


      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add Assessment Success",
        showConfirmButton: false,
        timer: 2000,
      });
      onHide(); // close the modal after successful form submission
      refetch()
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Add Assessment Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });



  return (
    <Modal
      show={isOpen}
      onHide={onHide}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton style={{borderRadius:"10px 10px 0 0"}}>
        <Modal.Title>Add Assessment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => addButtonHandler.mutate(e)}>
          <Form.Group className="mb-3 w-full flex justify-between">
            <Form.Label className="me-5">Name :</Form.Label>
            <Form.Control
              className="form-input rounded-md w-50 text-center"
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 w-full flex justify-between">
            {" "}
            <Form.Label className="me-8">Math :</Form.Label>{" "}
            <Form.Select
              className="form-input rounded-md"
              style={{ width: "179px" }}
              name="math"
              onChange={handleChange}
            >
              {" "}
              <option>1</option> <option>2</option> <option>3</option>{" "}
              <option>4</option> <option>5</option> <option>6</option>{" "}
              <option>7</option> <option>8</option> <option>9</option>{" "}
              <option>10</option>{" "}
            </Form.Select>{" "}
          </Form.Group>{" "}
          <Form.Group className="mb-3 w-full flex justify-between">
            {" "}
            <Form.Label className="me-2">Science :</Form.Label>{" "}
            <Form.Select
              className="form-input rounded-md"
              style={{ width: "179px" }}
              name="science"
              onChange={handleChange}
            >
              {" "}
              <option>1</option> <option>2</option> <option>3</option>{" "}
              <option>4</option> <option>5</option> <option>6</option>{" "}
              <option>7</option> <option>8</option> <option>9</option>{" "}
              <option>10</option>{" "}
            </Form.Select>{" "}
          </Form.Group>{" "}
          <Form.Group className="mb-3 w-full flex justify-between">
            {" "}
            <Form.Label>English :</Form.Label>{" "}
            <Form.Select
              className="form-input rounded-md"
              style={{ width: "179px" }}
              name="english"
              onChange={handleChange}
            >
              {" "}
              <option>1</option> <option>2</option> <option>3</option>{" "}
              <option>4</option> <option>5</option> <option>6</option>{" "}
              <option>7</option> <option>8</option> <option>9</option>{" "}
              <option>10</option>{" "}
            </Form.Select>{" "}
          </Form.Group>{" "}
          <Form.Group className="mb-3 w-full flex justify-between">
            {" "}
            <Form.Label>Soft - Skill :</Form.Label>{" "}
            <Form.Select
              className="form-input rounded-md"
              style={{ width: "179px" }}
              name="soft_skill"
              onChange={handleChange}
            >
              {" "}
              <option>1</option> <option>2</option> <option>3</option>{" "}
              <option>4</option> <option>5</option> <option>6</option>{" "}
              <option>7</option> <option>8</option> <option>9</option>{" "}
              <option>10</option>{" "}
            </Form.Select>{" "}
          </Form.Group>
          <div className="mt-4 flex justify-end">
            <Button
              className="border-0 pe-5 rounded ps-5 bd-highlight"
              style={{ backgroundColor: "#E50914",fontWeight:"bold" }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddAssessmentModal;
