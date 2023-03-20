import React, { useEffect, useState } from "react";

import { Button, Alert, Form, Spinner, Table } from 'react-bootstrap';
import Layout from "../components/Layout";
import setting from "../setting";

import { DataContext } from "../src/DataContext";
import { Message } from "../src/SharedData";

function checkStringsNotNullOrEmpty(...params: (string | null)[]): boolean {
  for (const param of params) {
    if (param === null || typeof param !== 'string' || param.trim() === '') {
      return false;
    }
  }
  return true;
}

export default function ChatPage() {

  const { sharedData, setSharedData } = React.useContext(DataContext);
  const [message, setMessage] = useState<string>('Hello World!!!');
  const [socket, setSocket] = useState<WebSocket>();
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [curr_room, setCurrRoom] = useState<string | null>(null);
  const [prev_room, setPrevRoom] = useState<string | null>(null);

  useEffect(() => {
    const socket = new WebSocket(setting.wsPath === null ?
      (() => {
        // 本番環境
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        const path = window.location.pathname;
        if (host && path) {
          return `${protocol}//${host}/cable`;
        }
      })()
      :
      // 開発環境
      `${setting.wsPath}/cable`
    );
    setSocket(socket);
    console.log(socket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        setReady(true);
      };
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case 'ping':
            socket.send(JSON.stringify({
              type: 'pong',
              message: "pong!!!",
            }));
            break;
          case 'confirm_subscription':
            console.log('Subscribed to channel');
            break;
          case 'welcome':
            console.log('Welcome message');
            break;
          default:
            console.log(`Message received: ${JSON.stringify(data.message.message)}`);
            setSharedData({
              ...sharedData,
              messages: [{
                username: data.message.message.username,
                message: data.message.message.message,
              } as Message, ...sharedData.messages],
            });
            break;
        }
      };
      socket.onclose = (event) => {
        console.log('Socket closed connection: ', event);
      };
      socket.onerror = () => {
        setReady(true);
        setError('Socket encountered an error.');
      };
    }
  }, [setSharedData, sharedData, socket]);

  const Send = () => {
    if (socket) {
      socket.send(JSON.stringify({
        command: 'message',
        identifier: JSON.stringify({
          channel: 'ChatChannel',
          room: curr_room,
        }),
        data: JSON.stringify({
          message: {
            username: sharedData.username,
            message: message,
          },
        }),
      }));
    }
  };

  return (
    <Layout>
      <div id="Chat">
        <Form>
          <Form.Group className="mt-3 d-flex justify-content-around">
            <Form.Group className="w-50">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={sharedData.username} onInput={(e) => {
                setSharedData({
                  ...sharedData,
                  username: e.currentTarget.value,
                });
              }} />
            </Form.Group>
            <Form.Group className="w-50">
              <Form.Label>Room ({curr_room || 'None'})</Form.Label>
              <Form.Group className="d-flex justify-content-around align-items-stretch">
                <Form.Control type="text" placeholder="Enter room" value={sharedData.room} onInput={(e) => {
                  setSharedData({
                    ...sharedData,
                    room: e.currentTarget.value
                  });
                }} />
                <Button variant="info" className="d-block m-0 text-nowrap" onClick={() => {
                  if (socket) {
                    if (prev_room) {
                      socket.send(JSON.stringify({
                        command: 'unsubscribe',
                        identifier: JSON.stringify({ channel: 'ChatChannel', room: prev_room }),
                      }));
                    }
                    socket.send(JSON.stringify({
                      command: 'subscribe',
                      identifier: JSON.stringify({ channel: 'ChatChannel', room: sharedData.room }),
                    }));
                    setPrevRoom(curr_room);
                    setCurrRoom(sharedData.room);
                  }
                }}>Join 🚪</Button>
              </Form.Group>
            </Form.Group>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={5} value={message} onInput={(e) => {setMessage(e.currentTarget.value)}}/>
          </Form.Group>
          <Button variant="primary" className="mt-3 d-block m-auto" onClick={Send} disabled={ready === false || checkStringsNotNullOrEmpty(sharedData.username, message) === false || curr_room === null}>Send 📨</Button>
        </Form>
        {
          curr_room === null && (
            <Alert variant="warning" className="mt-3">
              Please join a room.
            </Alert>
          )
        }
        {
          checkStringsNotNullOrEmpty(sharedData.username, message) === false && (
            <Alert variant="warning" className="mt-3">
              Please enter username and message.
            </Alert>
          )
        }
        {
          error && <Alert variant="danger" className="mt-3">{error}</Alert>
        }
        {
          ready === false && (
            <div className="d-flex justify-content-around mt-3">
              <Spinner animation="border" variant="primary" />
              <Spinner animation="border" variant="secondary" />
              <Spinner animation="border" variant="success" />
              <Spinner animation="border" variant="danger" />
              <Spinner animation="border" variant="warning" />
              <Spinner animation="border" variant="info" />
              <Spinner animation="border" variant="light" />
              <Spinner animation="border" variant="dark" />
            </div>
          )
        }
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th className="w-25">Username</th>
              <th className="w-75">Message</th>
            </tr>
          </thead>
          <tbody>
            {
              sharedData.messages.map((message, index) => (
                <tr key={index}>
                  <td>{message.username}</td>
                  <td>{message.message}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};
