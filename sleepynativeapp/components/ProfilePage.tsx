import { PageTemplate } from "./PageTemplate";
import React, {useState } from "react";
import { View, Text} from "react-native";
import { TextField } from "./material/TextField";
import { Card } from "./material/Card";
import { relationshipStatus, UserEx } from "../helpers/Types";
import { gender } from "../helpers/Types";
import { Select } from "./material/Select";

export function ProfilePage() {

    const [state, setState] = useState(UserEx);

    const onEmailChange = (arg: string) => 
    setState((prev) => ({
        ...prev,
        email : arg,
    }));

    const onPasswordChange = (arg: string) => 
    setState((prev) => ({
        ...prev,
        password : arg,
    }));

    const onGenderChange = (arg: string) => 
    setState((prev) => ({
        ...prev,
        gender : (arg as gender),
    }));

   
    const onOccupationChange = (arg: string) => 
    setState((prev) => ({
        ...prev,
        occupation : arg,
    }));

    const onNameChange = (arg: string) => 
    setState ((prev) => ({
        ...prev,
        name: arg,
    }));

    const onDateOfBirthChange = (arg: string) => 
    setState ((prev) => ({
        ...prev,
        dateOfBirth : arg,
    }));

    const onRelationshipStatusChange = (arg: string) => 
    setState ((prev) => ({
        ...prev,
        relationshipStatus : (arg as relationshipStatus),
    }));

    return (
        <PageTemplate>
            <View style={{height: "100%", width: "100%", paddingHorizontal: 20, justifyContent: "center"}}>
                <Text style={{paddingBottom: "10%" ,fontSize: 25, alignSelf: "center"}}>Din profil</Text>
                <Card style={{padding: 20}}>
                    <Text style={{color: "white"}}>Email</Text>
                    <TextField value={state.email} onChange={onEmailChange} placeholderText={state.email}/>
                    <Text style={{color: "white"}}>Navn</Text>
                    <TextField value={state.name} onChange={onNameChange} placeholderText={state.name}/>
                    <Text style={{color: "white"}}>Passord</Text>
                    <TextField value={state.password} onChange={onPasswordChange} placeholderText={state.password}/> 
                    <Text style={{color: "white"}}>Fødselsdato</Text>
                    <TextField value={state.dateOfBirth} onChange={onDateOfBirthChange} placeholderText={state.dateOfBirth}/> 
                    <Text style={{color: "white"}}>Kjønn</Text>
                    <Select value={state.gender} onChange={onGenderChange} placeholderText={state.gender} options={["male", "female", "other"]} optionDisplay={(arg: gender) => {
                    if (arg === "male") return "Mann"
                    else if (arg === "female") return "Kvinne"
                    else return "Annet"
                    }}/>
                    <Text style={{color: "white"}}>Yrke</Text>
                    <TextField value={state.occupation} onChange={onOccupationChange} placeholderText={state.occupation}/>
                    <Text style={{color: "white"}}>Sivilstatus</Text>
                    <Select value={state.relationshipStatus} onChange={onRelationshipStatusChange} placeholderText={state.relationshipStatus} options={["married", "coliving", "relationship", "single"]} optionDisplay={ (arg: relationshipStatus) => {
                    if (arg === "married") return "Gift"
                    if (arg === "coliving") return "Samboer"
                    if (arg === "relationship") return "Fast forhold"
                    return "Single"
                    }}/>
                </Card>
            </View>
        </PageTemplate>
    )
}

