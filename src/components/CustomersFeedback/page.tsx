import React, { useState } from "react";
import { FiThumbsUp, FiThumbsDown, FiSearch } from "react-icons/fi";

// Sample data for customer feedback
const generateCustomerFeedbackData = () => {
  const feedbackData: {
    customerName: string;
    product: string;
    comment: string;
    appreciation: string; // Change this to string
  }[] = [];

  const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
    "Kathy",
    "Liam",
    "Mona",
    "Nina",
    "Oscar",
    "Paul",
    "Quinn",
    "Rachel",
    "Sam",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Clark",
    "Lewis",
    "Young",
    "Allen",
  ];
  const productNames = [
    "Luxe Velvet Sofa",
    "Modern Coffee Table",
    "Ergo Office Chair",
    "Industrial Bookshelf",
    "Classic Armchair",
    "Mid-Century Dining Table",
    "Sleek TV Stand",
    "Cozy Lounge Chair",
  ];
  const feedbackPhrases = [
    {
      comment: "This is an excellent product! I'm very satisfied with it.",
      appreciation: "satisfied",
    },
    {
      comment: "The quality could be improved, but overall it's good.",
      appreciation: "satisfied",
    },
    {
      comment: "I'm really happy with my purchase. Would recommend!",
      appreciation: "satisfied",
    },
    {
      comment: "Not what I expected, unfortunately. I'm disappointed.",
      appreciation: "unsatisfied",
    },
    {
      comment: "Great value for the price. I'm pleased with it.",
      appreciation: "satisfied",
    },
    {
      comment: "It looks nice, but it's not as comfortable as I hoped.",
      appreciation: "unsatisfied",
    },
    {
      comment: "Very durable and stylish. Would definitely buy again!",
      appreciation: "satisfied",
    },
    {
      comment: "It's okay, but not as described in the listing.",
      appreciation: "unsatisfied",
    },
  ];

  for (let i = 1; i <= 100; i++) {
    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomIndex = Math.floor(Math.random() * productNames.length);
    const feedback =
      feedbackPhrases[Math.floor(Math.random() * feedbackPhrases.length)];
    feedbackData.push({
      customerName: `${randomFirstName} ${randomLastName}`,
      product: productNames[randomIndex],
      comment: feedback.comment,
      appreciation: feedback.appreciation, // Now it's just a string
    });
  }

  return feedbackData;
};

export const CustomersFeedback = () => {
  const feedbackData = generateCustomerFeedbackData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFeedback, setFilteredFeedback] = useState(feedbackData);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 25;

  // Filter feedback based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = feedbackData.filter(
      (feedback) =>
        feedback.customerName.toLowerCase().includes(lowercasedQuery) ||
        feedback.product.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredFeedback(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredFeedback.length / feedbackPerPage);
  const currentFeedback = filteredFeedback.slice(
    (currentPage - 1) * feedbackPerPage,
    currentPage * feedbackPerPage
  );

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      {/* Search Bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="relative flex items-center gap-3 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Feedback"
            className="p-2 px-4 pl-10 rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
          />
          <FiSearch className="absolute left-3 text-stone-500 text-lg" />
        </div>
      </div>

      {/* Feedback Table */}
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {currentFeedback.map((feedback, index) => (
            <TableRow
              key={feedback.customerName + feedback.product}
              customerName={feedback.customerName}
              product={feedback.product}
              comment={feedback.comment}
              appreciation={feedback.appreciation} // 'appreciation' is now a string
              order={index + 1}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-stone-200 rounded disabled:bg-stone-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-stone-200 rounded disabled:bg-stone-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Customer Name</th>
        <th className="text-start p-1.5">Product</th>
        <th className="text-start p-1.5">Comment</th>
        <th className="text-start p-1.5">Appreciation</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  customerName,
  product,
  comment,
  appreciation,
  order,
}: {
  customerName: string;
  product: string;
  comment: string;
  appreciation: string; // appreciation is now a string
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">{customerName}</td>
      <td className="p-1.5">{product}</td>
      <td className="p-1.5">{comment}</td>
      <td className="p-1.5">
        {appreciation === "satisfied" ? (
          <FiThumbsUp className="text-green-500" />
        ) : (
          <FiThumbsDown className="text-red-500" />
        )}
      </td>
    </tr>
  );
};
