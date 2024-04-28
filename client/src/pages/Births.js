import {
    Box,
    ChakraProvider,
    Flex,
    Spacer,
    Text,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../components/Button"; // Corrected import
import TaskTable from "../components/Table"; // Corrected import
import { useNavigate, useParams } from "react-router-dom";

const Births = () => {
    const { projectId } = useParams();

    const user = JSON.parse(localStorage.getItem("userInfo"));
    const [projects, setProjects] = useState({});
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();
    const milkProductionUrl = 'http://localhost:5000/birth';

    useEffect(() => {
        const getUser = () => {
            const user = JSON.parse(localStorage.getItem("userInfo"));
            if (!user) navigate("/login");
        };

        getUser();
    }, [navigate]);

    const getProject = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/birth`);
            const jsondata = response.data;
            
            console.log(jsondata);
            setProjects(jsondata.births);
            setLoading(false);
        } catch (err) {
            toast({
                title: "Error fetching the projects.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getProject();
    }, [projectId]);

    return (
        <Flex h="100vh" justifyContent="center" alignItems="center">
            <Box
                bg="white"
                height="90vh"
                width="100%"
                m="30px"
                borderRadius="20px"
                overflow="auto"
                css={{
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                <Flex
                    ml="4"
                    alignItems="center"
                    justify="space-between"
                    wrap="wrap"
                    gap="5"
                >
                    <Spacer />
                </Flex>

                <Flex
                    ml="4"
                    mt="35"
                    mb="20px"
                    alignItems="center"
                    justify="space-between"
                    wrap="wrap"
                    gap="5"
                >
                    <Text fontSize="xl">{projects.description}</Text>
                    <Spacer />
                    <Button
                        user={user}
                        projectID={projects._id}
                        Tasksarray={projects.tasks || []} // Ensure Tasksarray is always an array
                    />
                </Flex>
                <TaskTable projectData={projects} url={milkProductionUrl} />
            </Box>
        </Flex>
    );
};

export default Births;
