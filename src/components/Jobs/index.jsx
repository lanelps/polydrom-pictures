import React, { useEffect, useRef, useCallback } from "react";
import tw, { css, styled } from "twin.macro";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Grid, Button } from "~components";
import { useApp, useZIndex } from "~hooks";

import { getColor } from "~utils/css";

import { ReactComponent as Clock } from "~assets/svg/icons/info/clock.svg";
import { ReactComponent as Globe } from "~assets/svg/icons/info/globe.svg";
import { ReactComponent as Wallet } from "~assets/svg/icons/info/wallet.svg";

//

dayjs.extend(relativeTime);

//

const Conatiner = styled.section(({ active }) => [
  tw`absolute top-0 bottom-0 left-0 right-0 py-4 bg-offwhite/60 backdrop-blur-[7px] opacity-0 pointer-events-none transition-opacity overflow-y-scroll`,
  active && tw`opacity-100 pointer-events-auto`,
]);
const EmptyCard = tw.li`relative w-full col-span-full p-4 bg-offwhite/60 border rounded-[5px]`;

//

const Jobs = ({ jobs }) => {
  const { isWindowActive, activeWindows } = useApp();
  const jobsActive = isWindowActive('jobs');

  const containerRef = useRef(null);

  const zIndex = useZIndex("jobs");

  // Function to update z-index directly on the DOM element
  const updateZIndex = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.zIndex = zIndex;
    }
  }, [zIndex]);

  useEffect(() => {
    updateZIndex();
  }, [activeWindows, updateZIndex]);

  return (
    <Conatiner ref={containerRef} active={jobsActive}>
      <Grid node="ul">
        {jobs?.length > 0 ? (
          jobs?.map((job) => <JobCard key={job?._key} job={job} />)
        ) : (
          <EmptyCard>
            <h3 tw="font-main text-m-h3 sm-t:text-d-h3">
              No Job Listings.
              <br />
              Stay Tuned.
            </h3>
          </EmptyCard>
        )}
      </Grid>
    </Conatiner>
  );
};

export default Jobs;

const JobContainer = tw.li`relative w-full col-span-full sm-d:col-span-2`;
const JobWrapper = tw.article`relative w-full flex flex-col gap-y-[1.125rem] sm-t:gap-y-6 p-4 bg-offwhite/60 border rounded-[5px]`;
const Title = tw.h3`font-main text-m-h3 sm-t:text-d-h3`;
const InfoWrapper = tw.ul`flex flex-col gap-y-2`;
const InfoItem = tw.li`relative flex items-center gap-x-2`;
const Info = tw.h4`font-main text-m-b3 sm-t:text-d-b3 text-grey`;
const Description = tw.p`font-main text-d-b2`;
const Created = tw.p`font-main text-caption text-grey uppercase`;

const JobCard = ({ job }) => (
  <JobContainer>
    <JobWrapper>
      <Title>{job?.title}</Title>
      <InfoWrapper>
        <InfoItem>
          <Clock css={[tw`w-[18px]`]} color={getColor(`grey`)} />
          <Info>{job?.timeline}</Info>
        </InfoItem>

        <InfoItem>
          <Globe css={[tw`w-[18px]`]} color={getColor(`grey`)} />
          <Info>{job?.location}</Info>
        </InfoItem>

        <InfoItem>
          <Wallet css={[tw`w-[18px]`]} color={getColor(`grey`)} />
          <Info>{job?.pay}</Info>
        </InfoItem>
      </InfoWrapper>
      <Description>{job?.description}</Description>
      <div tw="flex gap-x-5 items-center justify-between">
        <div tw="flex gap-x-2">
          <Button
            css={[tw`uppercase`]}
            name="Open description"
            to={job?.jobFile?.asset?.url}
          >
            Full Description
          </Button>
          <Button
            css={[tw`uppercase`]}
            name="Apply to"
            to="mailto:jobs@polydrom.tv"
          >
            Apply
          </Button>
        </div>
        <Created>Posted {dayjs(job?._createdAt).fromNow()}</Created>
      </div>
    </JobWrapper>
  </JobContainer>
);
