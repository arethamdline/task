import { useState } from 'react';
import { initialTasks } from '@/data/seed';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="flex gap-2 mb-6">
            <Input 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What needs to be done?"
            />
            <Button type="submit">Add</Button>
          </form>
          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTask(task.id)}>
                  {task.completed ? <CheckCircle2 className="text-primary" /> : <Circle className="text-muted-foreground" />}
                  <span className={cn(task.completed && "line-through text-muted-foreground")}>{task.title}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
