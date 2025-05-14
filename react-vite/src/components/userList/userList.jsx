// src/components/UserSocketList.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');  

export default function UserSocketList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 请求后端获取用户和对应的笔记
    socket.emit('get_users');

    // 监听从后端返回的用户数据
    socket.on('users_data', (data) => {
      // 假设返回的数据结构中包含 `users` 数组
      setUsers(data.users);
    });

    // 清理监听器
    return () => {
      socket.off('users_data');
    };
  }, []);

  return (
    <div>
      <h2>Users and Their Notes</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.username}</strong> (ID: {user.id})
            <ul>
              {user.notes && user.notes.length > 0 ? (
                user.notes.map(note => (
                  <li key={note.id}>
                    <strong>{note.title}</strong>: {note.content}
                  </li>
                ))
              ) : (
                <li>No notes available</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

