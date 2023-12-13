import React, { useState } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      name
      email
      phoneNumber
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query getUserDetailByEmail($email: String!) {
    userDetail(email: $email) {
      name
      email
      phoneNumber
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: RegisterInput!) {
    register(input: $input) {
      name
      email
      phoneNumber
    }
  }
`;

export const AllUsers = () => {
  const { data: allUsers, loading, allUsersError } = useQuery(QUERY_ALL_USERS);
  const [getUser, { data: userDetails, userDetailsError }] =
    useLazyQuery(GET_USER_BY_EMAIL);
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password, setPassword] = useState("");
  if (allUsersError) {
    console.log(allUsersError);
  }
  if (userDetailsError) {
    console.log(userDetailsError);
  }
  return (
    <>
      <h1>All Users</h1>
      {loading && <h1>loading data...</h1>}
      {allUsers &&
        allUsers.users.map((user, index) => {
          return (
            <div key={index}>
              <h2>Name: {user.name}</h2>
              <h4>Email: {user.email}</h4>
              <h4>Phone Number: {user.phoneNumber}</h4>
            </div>
          );
        })}
      <div>
        <input
          type="text"
          placeholder="enter user name..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() =>
            getUser({
              variables: {
                email: search,
              },
            })
          }
        >
          get data
        </button>
        {userDetails && (
          <div>
            <h2>Name: {userDetails.userDetail.name}</h2>
            <h4>Email: {userDetails.userDetail.email}</h4>
            <h4>Phone Number: {userDetails.userDetail.phoneNumber}</h4>
          </div>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="phone number..."
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  email,
                  phoneNumber: parseFloat(phoneNumber),
                  password,
                },
              },
            });
          }}
        >
          Register
        </button>
      </div>
    </>
  );
};
