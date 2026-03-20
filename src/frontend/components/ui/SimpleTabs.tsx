export type SimpleTabItem = { key: string; name: string; onClick: () => void };

type Props = { tabs: SimpleTabItem[]; activeTabKey: string };

export default function SimpleTabs({ tabs, activeTabKey }: Props) {
  if (tabs.length === 0) {
    return null;
  }
  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={tab.onClick}
          className={`cursor-pointer px-4 py-2 text-sm font-medium ${
            activeTabKey === tab.key
              ? 'border-primary text-primary border-b-2'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
