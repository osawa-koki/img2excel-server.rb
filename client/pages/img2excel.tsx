import React, { useEffect, useState } from "react";

import { Button, Alert, Form, Spinner, Table } from 'react-bootstrap';
import Layout from "../components/Layout";
import setting from "../setting";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

export default function Img2ExcelPage() {

  const _canvas = React.createRef<HTMLCanvasElement>();
  const [loading, setLoading] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    const base64 = canvas.toDataURL("image/png");
    console.log("Base64-encoded image: ", base64);
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
      </div>
    </Layout>
  );
};
