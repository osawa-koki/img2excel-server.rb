import React, { useEffect, useState } from "react";

import { Button, Alert, Form, Spinner } from 'react-bootstrap';
import Layout from "../components/Layout";
import setting from "../setting";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

export default function Img2ExcelPage() {

  const _canvas = React.createRef<HTMLCanvasElement>();
  const [loading, setLoading] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    canvas = _canvas.current as HTMLCanvasElement;
    ctx = canvas.getContext("2d");
  }, [_canvas]);

  const FileRegister = (e: React.FormEvent<HTMLInputElement>) => {
    setError(null);
    if (e.currentTarget.files) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          canvas.width = width;
          canvas.height = height;

          if (width * height < 128 * 128) {
            ctx.drawImage(img, 0, 0);
            setRegistered(true);
          } else {
            console.log("Image size is not less than 128x128.");
            setError("Image size is not less than 128x128.");
          }
        };
      }
      reader.readAsDataURL(e.currentTarget.files[0]);
    }
  };

  const Img2Excel = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, setting.small_waitingTime));
    const base64 = canvas.toDataURL("image/png").replace(/^data:image\/(png|jpg);base64,/, "")
    console.log("Base64-encoded image: ", base64);
    const res = await fetch(`${setting.apiPath}/api/img2excel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64,
      }),
    });
    const data = await res.json();
    const id = data.id;
    setId(id);
    setLoading(false);
  };

  return (
    <Layout>
      <div id="Img2Excel">
        <Form.Group className="mt-3">
          <Form.Label>Select Image File.</Form.Label>
          <Form.Control type="file" accept="image/*" onInput={FileRegister} />
        </Form.Group>
        <canvas ref={_canvas} style={{width: "300px", height: "300px"}} className="mt-3 d-block m-auto border"></canvas>
        <Button variant="primary" className="mt-3 d-block m-auto" onClick={() => {Img2Excel()}} disabled={registered === false}>Convert</Button>
        {
          error &&
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        }
        {
          loading &&
          <div className="mt-5 d-flex justify-content-between">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
          </div>
        }
        {
          id &&
          <div className="mt-5">
            <a href={`${setting.apiPath}/api/img2excel/${id}`} className="btn btn-outline-success d-block m-auto" download>Download</a>
          </div>
        }
      </div>
    </Layout>
  );
};
