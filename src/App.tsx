import { useState } from "react";
import AddEntry from "./AddEntry";
import EntryList from "./EntryList";
import type { StudyEntry } from "./Logic";

const App: React.FC = () => {
  const [entries, setEntries] = useState<StudyEntry[]>([]);

  const addEntry = (entry: StudyEntry) => {
    setEntries([...entries, entry]);
  };

  return (
    <div>
      <h1>Study Tracker</h1>
      <AddEntry addEntry={addEntry} />
      <EntryList entries={entries} />
    </div>
  );
};

export default App;