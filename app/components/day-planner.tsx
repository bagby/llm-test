import React, { useState } from 'react';

interface TodoItem {
  id: number;
  task: string;
}

const DayPlanner: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [plan, setPlan] = useState<string>('');
  const [input, setInput] = useState<string>('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), task: input }]);
      setInput('');
    }
  };

  const generatePlan = async () => {
    if (todos.length === 0) {
      alert('Please add at least one "To do" item.');
      return;
    }

    const tasks = todos.map((todo) => todo.task).join(', ');
    const response = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({tasks}),
    });

    if (response.ok) {
      const data = await response.json();
      setPlan(data.plan);
    } else {
      alert('Failed to generate plan. Please try again.');
    }
  };

  return (
    <div>
      <h1>Day Planner</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a to-do item"
        />
        <button onClick={addTodo}>Add To-Do</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
      <button onClick={generatePlan}>Generate Plan</button>
      {plan && (
        <div>
          <h2>Your Day Plan</h2>
          <p>{plan}</p>
        </div>
      )}
    </div>
  );
};

export default DayPlanner;