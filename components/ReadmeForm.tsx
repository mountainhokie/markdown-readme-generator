import { useState, ChangeEvent } from "react";
import { marked } from "marked";

interface FormData {
  about: string;
  "Built With": string;
  "Getting Started": string;
  prerequisites: string;
  installation: string;
  usage: string;
  roadmap: string;
  contributions: string;
  license: string;
  contact: string;
  acknowledgements: string;
}

interface VisibleSections {
  about: boolean;
  "Built With": boolean;
  "Getting Started": boolean;
  prerequisites: boolean;
  installation: boolean;
  usage: boolean;
  roadmap: boolean;
  contributions: boolean;
  license: boolean;
  contact: boolean;
  acknowledgements: boolean;
}

const ReadmeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    about: "This is a quick ReadMe.md file generator for Github projects",
    "Built With":
      "* ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) \n\n " +
      "* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) \n\n" +
      "* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)",
    "Getting Started":
      "To get a local copy up and running follow these simple example steps.",
    prerequisites:
      "* node (v18.17.0+) \n" +
      "Download lastest [Node.Js](https://nodejs.org/en/download/package-manager) \n\n" +
      "* npm (9.6.7+) \n" +
      "```sh \n" +
      "npm install npm@latest -g \n" +
      "```",
    installation:
      "Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services. \n\n " +
      "Clone the repo \n\n" +
      "```sh \n " +
      "git clone https://github.com/your_username_/Project-Name.git \n " +
      " ``` \n " +
      "Install NPM packages \n " +
      "```sh \n " +
      "npm install \n " +
      "```",
    usage:
      "To use either copy or download the markdown and add it to your main github repository folder.",
    roadmap:
      "- [x] Initalize Repository \n" +
      "- [ ] Add Changelog \n" +
      "- [ ] Add dynamically created sections \n" +
      "- [ ] Refactor code \n",
    contributions:
      "If you have a suggestion that would make this better, please fork the repo and create a pull request. ",
    license: "Distributed under the MIT License.",
    contact:
      "Your Name - email@example.com \n\n" +
      "Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)",
    acknowledgements:
      "* [Choose an Open Source License](https://choosealicense.com) \n " +
      "* [Markdown Inspiration](https://github.com/othneildrew/Best-README-Template/blob/master/README.md) \n " +
      "* [Markdown Badges](https://github.com/Ileriayo/markdown-badges)",
  });

  const [visibleSections, setVisibleSections] = useState<VisibleSections>({
    about: true,
    "Built With": true,
    "Getting Started": true,
    prerequisites: true,
    installation: true,
    usage: true,
    roadmap: true,
    contributions: true,
    license: true,
    contact: true,
    acknowledgements: true,
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.currentTarget;
      const curTarget = e.currentTarget;
      console.log(selectionStart, selectionEnd, e.currentTarget);
      const value = formData[field];
      const newValue =
        value.slice(0, selectionStart) + "\n\n" + value.slice(selectionEnd);
      setFormData({ ...formData, [field]: newValue });
      setTimeout(() => {
        console.log(e.currentTarget, curTarget);
        curTarget.selectionStart = curTarget.selectionEnd = selectionStart + 2;
        curTarget.scrollTop = curTarget.scrollHeight;
      }, 0);
    }
  };

  const handleVisibilityToggle = (section: keyof VisibleSections) => {
    setVisibleSections({
      ...visibleSections,
      [section]: !visibleSections[section],
    });
  };

  const generateMarkdown = (): string => {
    const sections: { [key: string]: string } = {
      about: "## About\n" + formData.about,
      "Built With": "## Built With\n" + formData["Built With"],
      "Getting Started": "## Getting Started\n" + formData["Getting Started"],
      prerequisites: "### Prerequisites\n" + formData.prerequisites,
      installation: "### Installation\n" + formData.installation,
      usage: "## Usage\n" + formData.usage,
      roadmap: "## Roadmap\n" + formData.roadmap,
      contributions: "## Contributions\n" + formData.contributions,
      license: "## License\n" + formData.license,
      contact: "## Contact\n" + formData.contact,
      acknowledgements: "## Acknowledgements\n" + formData.acknowledgements,
    };

    return Object.keys(sections)
      .filter((section) => visibleSections[section as keyof VisibleSections])
      .map((section) => sections[section])
      .join("\n\n");
  };

  const markdown = generateMarkdown();
  const html = marked(markdown);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdown);
    alert("Text Copied!");
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
    alert("Downloaded!");
  };

  return (
    <>
      <section className="py-20 px-4 lg:px-16 overflow-hidden relative z-10">
        <div className="container">
          <div className="mb-5 flex items-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">
              Markdown Readme Generator
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between -mx-4">
            <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
              <div className="bg-gray-100 relative rounded-lg p-8 sm:p-12 shadow-lg">
                <form>
                  {Object.keys(formData).map((field) => (
                    <div key={field} className="mb-6">
                      <div className="mb-2 flex justify-between">
                        <label className="block text-sm font-medium text-gray-800">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            handleVisibilityToggle(
                              field as keyof VisibleSections
                            )
                          }
                          className={`mt-1 py-1 px-3 rounded text-xs text-white  ${
                            visibleSections[field as keyof VisibleSections]
                              ? "bg-green-500 hover:bg-green-400"
                              : "bg-red-500 hover:bg-red-700"
                          }`}
                        >
                          {visibleSections[field as keyof VisibleSections]
                            ? "Shown"
                            : "Hidden"}
                        </button>
                      </div>
                      <textarea
                        name={field}
                        value={(formData as any)[field]}
                        onChange={handleChange}
                        onKeyDown={(e) =>
                          handleKeyDown(e, field as keyof FormData)
                        }
                        className="
                w-full
                rounded
                p-3
                text-gray-800
                border-gray-500
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
                        rows={3}
                      />
                    </div>
                  ))}
                </form>
              </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-6/12 px-4">
              <div>
                <div className="p-4 rounded bg-[#0d1117]">
                  <div
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              </div>
              <div className="mt-8">
                <h2 className="my-4 text-xl font-bold">Markdown Code</h2>
                <pre className="p-4 overflow-auto bg-gray-100 rounded">
                  <code>{markdown}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 p-4 mt-4 flex gap-2 bg-white shadow-lg rounded">
        <button
          onClick={copyToClipboard}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <span>Copy Markdown</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            className="w-8 h-8 pl-2"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z"
                fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
        </button>
        <button
          onClick={downloadMarkdown}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <span>Download Markdown</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            className="w-6 h-6 pl-2"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"
                fill="#ffffff"
              ></path>{" "}
              <path
                d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
                fill="#ffffff"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
    </>
  );
};

export default ReadmeForm;
