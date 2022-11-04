import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const testBlog = {
  url: "test",
  title: "test title",
  author: "test author",
  likes: 1111,
  user: "6359ce91110f6abb8b623f44",
  id: "6359cf24110f6abb8b623f48",
};

test("This should display title and author only", () => {
  render(<Blog {...testBlog} />);
  const element = screen.getByText("test title");
  const element2 = screen.getByText("test author");
  screen.debug();

  expect(element).toBeDefined();
  expect(element2).toBeDefined();
});

//This test is for testing what happens when a button is clicked
test("Clicking more info", async () => {
  const mockHandler = jest.fn();

  render(<Blog {...testBlog} />);

  const user = userEvent.setup();
  const button = screen.getByText("More info");
  await user.click(button);
  screen.debug();

  const element1 = screen.getByText("1111 Likes");
  expect(element1).toBeDefined();
});

const testBlog2 = {
  likes: 1112,
};

test("Clicking for more likes ", async () => {
  const mockHandler = jest.fn();

  render(<Blog {...testBlog} addLikes={mockHandler} />);

  const user = userEvent.setup();
  const more_info = screen.getByText("More info");
  await user.click(more_info);
  const likesButton = screen.getByText("Add likes");
  await user.click(likesButton);
  //   await user.click(likesButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("Testing blog form", async () => {
  //This sets up a mock function that we use. Since in BlogForm we pass in the addBlog
  //function, this here gives us a "mock" of that function that we usually pass to our
  //BlogForm component. The name must match since in our BlogForm, we are destructuring the value
  // The interesting part here is that since addBlog depends on states inside the component,
  // I'm interested to see how that gets incorporated since we are not passing any
  // parameters to addBlog here
  const addBlog = jest.fn();

  //This simulates a user 
  const user = userEvent.setup();

  render(<BlogForm addBlog={addBlog} />);
  //Get the Create New Blog button that when we click, it shows the blog form
  const newBlog = screen.getByText("Create a New Blog");

  //Trying to teset if the button was clicked. We can't test internal functions like this but what we can do is we know that stuff is supposed to show after this button is clicked. So we can test for those things, such as the form we have
  await user.click(newBlog);
  const addBlogButton = screen.getByText("Add New Blog");

  //Now we get the add new blog button. As defined in our BlogForm component, this button
  //Submits the form when clicked. On submission, the form runs the wrapper function which
  //calls the addBlog function

  const inputTitle = screen.getByPlaceholderText("title");
  const inputAuthor = screen.getByPlaceholderText("author");
  const inputUrl = screen.getByPlaceholderText("url");
  const inputContent = screen.getByPlaceholderText("Add your thoughts..");


  await userEvent.type(inputTitle, "blog title");
  await userEvent.type(inputAuthor, "blog author");
  await userEvent.type(inputUrl, "blog url");
  await userEvent.type(inputContent, "blog content");
  await userEvent.click(addBlogButton);

  //This is for testing to see what properties the addBlog.mock has. Basically each function has these properties and we can test what they are and their values
  //The .calls property is the input values it is called with, which is what we need here 
   
  //expect(addBlog.mock).toBe("blog title")

  expect(addBlog.mock.calls[0][0].title).toBe("blog title")
  expect(addBlog.mock.calls[0][0].author).toBe("blog author")
  expect(addBlog.mock.calls[0][0].url).toBe("blog url")
  expect(addBlog.mock.calls[0][0].content).toBe("blog content")

  expect(addBlogButton).toBeDefined()
  // expect(addBlog.mock.calls).toHaveLength(1);
  // expect(screen.getByPlaceholderText("title")).toHaveValue("blog title")  
  // expect(addBlog.mock.calls[0][0].content).toBe("blog title");
});
