import { ChangeEvent, FC, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, orderBy, query } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { Alert, Avatar, Button, List, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";

import { useAuth } from "./useAuth";
import { db } from "./firebase";
import { Message } from "./type";

interface UserMessageProps {
  userName: string;
  text: string;
  userAvatar: string;
}

export const UserMessage: FC<UserMessageProps> = ({ userName, userAvatar, text }) => {
  return (
    <List.Item>
      <List.Item.Meta avatar={<Avatar src={userAvatar} />} title={userName} description={text} />
    </List.Item>
  );
};

export const Chat: FC = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [text, setText] = useState("");

  const [value, loading, error] = useCollection(
    query(collection(db, "messages"), orderBy("createdAt")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const context = useAuth();

  useEffect(() => {
    if (context?.user) {
      setIsAlertOpen(true);
      setTimeout(() => setIsAlertOpen(false), 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hanldeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = async () => {
    if (!context?.user) return;

    const { user } = context;

    addDoc(collection(db, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: text,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div>
      {isAlertOpen && <Alert type="success" message={`Welcome, ${context?.user?.displayName}!`} />}

      <List style={{ height: "calc(100vh - 100px)", overflowY: "auto" }}>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading &&  <Spin style={{marginTop: 50}} tip="Loading..."/>}

        {value?.docs.map((doc) => {
          const { displayName, photoURL, text } = doc.data() as Message;
          return (
            <UserMessage key={doc.id} userName={displayName} text={text} userAvatar={photoURL} />
          );
        })}
      </List>

      <TextArea
        style={{ height: 50, resize: "none" }}
        rows={4}
        onChange={hanldeChange}
        value={text}
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
};
