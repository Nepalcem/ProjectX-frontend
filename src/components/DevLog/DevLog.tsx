import { useEffect, useState } from "react";

type Commit = {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
};

export default function DevLog() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(
      "https://api.github.com/repos/nepalcem/projectX-frontend/commits?per_page=10"
    )
      .then(res => res.json())
      .then(data => {
        if (!cancelled && Array.isArray(data)) {
          setCommits(data);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-sm"
      aria-labelledby="dev-log-heading"
    >
      <h2
        id="dev-log-heading"
        className="mb-4 border-b border-slate-200 pb-3 text-lg font-semibold tracking-tight text-slate-800"
      >
        Developer&apos;s Log:
      </h2>
      {loading ? (
        <p className="text-sm text-slate-500">Loading recent commits…</p>
      ) : commits.length === 0 ? (
        <p className="text-sm text-slate-500">No commits to show.</p>
      ) : (
        <ul className="space-y-0 divide-y divide-slate-300">
          {commits.map(c => {
            const firstLine = c.commit.message.split("\n")[0];
            return (
              <li key={c.sha} className="py-3 first:pt-0 last:pb-0">
                <p
                  className="text-sm font-medium leading-snug text-slate-800"
                  title={c.commit.message}
                >
                  {firstLine}
                </p>
                <time
                  dateTime={c.commit.author.date}
                  className="mt-1 block text-xs text-slate-500"
                >
                  {new Date(c.commit.author.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </time>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
