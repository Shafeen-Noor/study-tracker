import type { StudyEntry } from "./Logic";
import "./App.css"
interface Props {
  entries: StudyEntry[];
}

const EntryList: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      <h2>Study Entries</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.date} - {entry.subject}: {entry.topic} ({entry.hours} hrs)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;