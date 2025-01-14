import axios from "axios";
import { useState } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Heading } from "../components/Heading";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import logo from "../assets/logo.png";

const apiUrl = import.meta.env.VITE_API_URL;

export const UpdateProfile = () => {
	const navigate = useNavigate();
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false); 
	const [message, setMessage] = useState(""); 

	const handleUpdate = async () => {
		try {
			setLoading(true);
			setMessage(""); 

			const updateData = {};
			if (firstname) updateData.firstname = firstname;
			if (lastname) updateData.lastname = lastname;
			if (password) updateData.password = password;

			const response = await axios.put(`${apiUrl}api/v1/user`, updateData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			setMessage(response.data.message); 

			setTimeout(() => {
				navigate("/dashboard"); 
			}, 2000);
		} catch (error) {
			setMessage("Error updating profile. Please try again later.");
			console.error("Update error:", error);
		} finally {
			setLoading(false); 
		}
	};

	return (
		<div className='bg-gradient-to-r from-blue-200 to-green-200 h-screen flex items-center justify-center'>
			<div className='flex flex-col items-center bg-white rounded-lg shadow-lg px-4 py-3 max-w-xs sm:max-w-sm w-full'>
				<div className='flex justify-center'>
					<img
						src={logo}
						alt='App Logo'
						className='m-2'
					/>
				</div>

				<Heading label={"Update Profile Details"} />
				<SubHeading label={"Enter your details to update"} />

				<div className='w-full space-y-2 sm:space-y-3 m-4'>
					<InputBox
						label='First Name'
						placeholder='John'
						onChange={(e) => setFirstname(e.target.value)}
					/>
					<InputBox
						label='Last Name'
						placeholder='Doe'
						onChange={(e) => setLastname(e.target.value)}
					/>
					<InputBox
						label='Password'
						type='password'
						placeholder='Password Must Be Between 6-15 Characters'
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						onClick={handleUpdate}
						label={loading ? "Updating..." : "Update Profile"} // Change label when loading
						disabled={loading} // Disable button while loading
					/>
				</div>

				{message && (
					<div className={`mt-3 text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
						<p>{message}</p>
					</div>
				)}

				<BottomWarning
					label={"Need More Help?"}
					buttonText={"Contact"}
					to={"/contact"}
				/>
			</div>
		</div>
	);
};
