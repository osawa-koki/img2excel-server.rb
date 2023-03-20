type SharedData = {
  username: string;
  room: string;
  messages: Message[];
};

type Message = {
  username: string;
  message: string;
}

export default SharedData;
export type { Message };
