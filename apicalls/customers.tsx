import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore'
import { db } from '@/firebase/firebase.config'

export const AddCustomer = async (payload: { id: string }) => {
	try {
		await setDoc(doc(db, 'customers', payload.id), payload)

		// update customer role
		await updateDoc(doc(db, 'customers', payload.id), {
			role: 'customer',
			status: 'pending',
		})
		return {
			success: true,
			message: 'Customer added successfully , please wait for approval',
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			}
		}
	}
	// handle case where error is not an instance of Error
}

export const CheckIfCustomerAccountIsApplied = async (id: string) => {
	try {
		const customers = await getDocs(
			query(collection(db, 'customers'), where('id', '==', id))
		)
		if (customers.size > 0) {
			return {
				success: true,
				message: 'Customer account already applied',
				data: customers.docs.map((doc, index) => {
					return {
						...doc.data(),
						id: doc.id,
					}
				})[0],
			}
		}

		return {
			success: false,
			message: 'Customer account not applied',
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			}
		}
	}
	// handle case where error is not an instance of Error
}

export const GetAllCustomers = async () => {
	try {
		const customers = await getDocs(collection(db, 'customers'))
		return {
			success: true,
			data: customers.docs.map((doc) => {
				return {
					...doc.data(),
					id: doc.id,
					firstName: doc.data().firstName,
					middleName: doc.data().middleName,
					lastName: doc.data().lastName,
					email: doc.data().email,
					phone: doc.data().phone,
					location: doc.data().location,
					city: doc.data().city,
					role: doc.data().role,
					status: doc.data().status,
				}
			}),
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			}
		}
	}
}

export const UpdateCustomer = async (payload: { id: string }) => {
	try {
		await setDoc(doc(db, 'customers', payload.id), payload)
		return {
			success: true,
			message: 'Customer updated successfully',
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			}
		}
		// handle case where error is not an instance of Error
	}
}

export const GetCustomerById = async (id: string) => {
	try {
		const customer = await getDoc(doc(db, 'customers', id))
		return {
			success: true,
			data: customer.data(),
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				success: false,
				message: error.message,
			}
		}
		// handle case where error is not an instance of Error
	}
}
