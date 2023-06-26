import {
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CopyIcon,
  ExternalLinkIcon,
  InfoIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import { useRef, useState } from "react";

interface CustomSelectOption {
  icon: any;
  text: string;
}

export default function CustomSelect() {
  const initRef = useRef<any>();
  const [activeOption, setActiveOption] = useState<CustomSelectOption>({
    icon: <UnlockIcon />,
    text: "HTML",
  });

  // TODO use correct Icons for Latex and HTML
  const options: CustomSelectOption[] = [
    { icon: <UnlockIcon boxSize={4} />, text: "HTML" },
    { icon: <ExternalLinkIcon boxSize={4} />, text: "Link" },
    { icon: <InfoIcon boxSize={4} />, text: "Latex" },
  ];

  return (
    <Popover placement={"bottom-end"} initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button h={12} borderEndRadius={0}>
              {activeOption.icon} <Text mx={2}>{activeOption.text}</Text>
              {isOpen ? <ChevronUpIcon boxSize={5} /> : <ChevronDownIcon boxSize={5} />}
            </Button>
          </PopoverTrigger>
          <IconButton
            ml={0.5}
            h={12}
            w={12}
            borderStartRadius={0}
            icon={<CopyIcon boxSize={4} />}
            aria-label={"copy the truth table as " + activeOption.text}
          />
          <PopoverContent w={"4xs"}>
            <PopoverArrow />
            <PopoverBody display={"flex"} flexDir={"column"} m={0} p={0}>
              {options
                .filter(option => option.text !== activeOption.text)
                .map((option: CustomSelectOption) => {
                  return (
                    <Button
                      ref={initRef}
                      key={option.text}
                      borderRadius={0}
                      flexDir={"row"}
                      justifyContent={"start"}
                      onClick={() => {
                        setActiveOption(option);
                        onClose();
                      }}
                    >
                      {option.icon}
                      <Text ml={4}>{option.text}</Text>
                    </Button>
                  );
                })}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
